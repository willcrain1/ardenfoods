/**
 * Arden Foods Co. — order-logging webhook for Google Sheets.
 *
 * Setup:
 * 1. Create a new Google Sheet (any name, e.g. "Arden Orders").
 * 2. Extensions > Apps Script. Delete the starter code and paste this
 *    whole file in its place.
 * 3. Deploy > New deployment > gear icon > select type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Click Deploy. Google will prompt you to authorize the script —
 *    click through (it's your own script, on your own sheet).
 * 5. Copy the Web app URL it gives you (ends in /exec) and paste it
 *    into SHEET_WEBHOOK_URL in assets/cart.js on the site.
 * 6. Place a test order on the site. A new row should appear within a
 *    few seconds, with a header row added automatically the first time.
 *
 * If you edit this script later, use Deploy > Manage deployments >
 * (pencil icon) > Version: New version > Deploy to keep the same URL.
 *
 * Workflow once orders are coming in:
 * - A customer Zelles you and gives you their order number.
 * - Find that order number in this sheet (sort/filter the Order # column)
 *   to see exactly what they ordered.
 * - Once you confirm the Zelle payment landed, change that row's Status
 *   to "Paid", then text the customer using the Ready-to-text Message
 *   column.
 */
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Orders");
  if (!sheet) {
    sheet = ss.insertSheet("Orders");
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Order #", "Status", "Total", "Customer Name",
      "Phone", "Email", "Delivery", "Address", "Notes", "Items",
      "Ready-to-text Message"
    ]);
    sheet.setFrozenRows(1);
  }

  var p = e.parameter;
  sheet.appendRow([
    p.timestamp || new Date().toLocaleString(),
    p.order_number || "",
    p.status || "Pending payment",
    p.total || "",
    p.customer_name || "",
    p.customer_phone || "",
    p.customer_email || "",
    p.delivery || "",
    p.address || "",
    p.notes || "",
    p.items || "",
    p.ready_to_text || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

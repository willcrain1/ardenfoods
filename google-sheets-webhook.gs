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
/**
 * Arden Foods Co. — order-logging webhook for Google Sheets with Email Notifications.
 */
function doPost(e) {
  // 1. FORCE THE SCRIPT TO OPEN YOUR EXACT SPREADSHEET BY ID
  var SPREADSHEET_ID = "1vZ0MCcy4DwbBjwkO0c_6XF2vdbVL9I3VyjXFdglSMWM"; 
  
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
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

  // Fallback engine: Try parsing incoming data as raw JSON first.
  var data = {};
  try {
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
  } catch (err) {
    // Fall back to parameters if not a JSON payload string
  }

  // Extract variables accurately from either structural type
  var timestamp     = data.timestamp     || e.parameter.timestamp     || new Date().toLocaleString();
  var order_number  = data.order_number  || data.number               || e.parameter.order_number || e.parameter.number || "";
  var status        = data.status        || e.parameter.status        || "Pending payment";
  var total         = data.total         || e.parameter.total         || "";
  var customer_name = data.customer_name || data.name                 || e.parameter.customer_name || e.parameter.name || "";
  var phone         = data.customer_phone|| data.phone                || e.parameter.customer_phone || e.parameter.phone || "";
  var email         = data.customer_email|| data.email                || e.parameter.customer_email || e.parameter.email || "";
  var delivery      = data.delivery      || e.parameter.delivery      || "Porch dropoff";
  var address       = data.address       || e.parameter.address       || "";
  var notes         = data.notes         || e.parameter.notes         || "";
  
  var items = data.items || e.parameter.items || "";
  if (typeof items === 'object') {
    items = JSON.stringify(items);
  }
  
  var ready_to_text = data.ready_to_text || e.parameter.ready_to_text || "";

  // Append data directly into your sheet
  sheet.appendRow([
    timestamp,
    order_number,
    status,
    total,
    customer_name,
    phone,
    email,
    delivery,
    address,
    notes,
    items,
    ready_to_text
  ]);

  // -------------------------------------------------------------------------
  // NEW: EMAIL NOTIFICATION ENGINE
  // -------------------------------------------------------------------------
  try {
    // Change this to whatever email address you want to receive notifications at
    var NOTIFICATION_RECIPIENT = "william.e.crain@gmail.com"; 
    
    var emailSubject = " New Arden Order Received: " + order_number + " (" + customer_name + ")";
    
    var emailBody = 
      "A new order has been logged in your Google Sheet.\n\n" +
      "==================================================\n" +
      "ORDER DETAILS\n" +
      "==================================================\n" +
      "Order Number: " + order_number + "\n" +
      "Customer Name: " + customer_name + "\n" +
      "Total Amount: " + total + "\n" +
      "Items: " + items + "\n\n" +
      "==================================================\n" +
      "DELIVERY & CONTACT\n" +
      "==================================================\n" +
      "Phone: " + phone + "\n" +
      "Email: " + (email || "Not provided") + "\n" +
      "Delivery Type: " + delivery + "\n" +
      "Address/Notes: " + (address || "None") + "\n" +
      "Order Notes: " + (notes || "None") + "\n\n" +
      "==================================================\n" +
      "Ready-to-text string:\n" +
      ready_to_text + "\n\n" +
      "View Spreadsheet: https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID + "/edit";

    MailApp.sendEmail({
      to: NOTIFICATION_RECIPIENT,
      subject: emailSubject,
      body: emailBody
    });
  } catch (mailError) {
    // Log failures silently so a broken email doesn't break the customer's checkout workflow
    console.error("Email notification failed to dispatch: " + mailError.toString());
  }
  // -------------------------------------------------------------------------

  // Return a clean text output to prevent browser errors
  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
# SFDC Sample Customer Data

This directory contains sample customer data from Salesforce (SFDC) for customers who are prospects for Yugabyte database sales.

## Files

- `customers_sample_data.csv` - CSV format of customer data
- `customers_sample_data.json` - JSON format of customer data
- `README.md` - This documentation file

## Data Structure

The sample data includes 20 enterprise customers with the following fields:

### Core Account Information
- **Account_ID** - Unique Salesforce account identifier
- **Account_Name** - Company name (from customers.txt)
- **Account_Type** - Customer classification (Enterprise)
- **Industry** - Business sector
- **Description** - Detailed company description and database needs

### Contact Information
- **Billing_Street** - Company address
- **Billing_City** - City
- **Billing_State** - State
- **Billing_Postal_Code** - ZIP code
- **Billing_Country** - Country
- **Phone** - Contact phone number
- **Website** - Company website

### Business Information
- **Annual_Revenue** - Company annual revenue in USD
- **Employee_Count** - Number of employees
- **Rating** - Sales qualification (Hot/Warm/Cold)
- **Customer_Since** - Date customer was first contacted
- **Last_Activity_Date** - Most recent activity date

### Sales Information
- **Account_Owner** - Salesforce account owner
- **Lead_Source** - How the lead was acquired
- **Status** - Current sales status
- **Sales_Stage** - Current stage in sales pipeline
- **Next_Steps** - Planned next actions
- **Notes** - Additional sales notes

### Database-Specific Information
- **Database_Requirements** - Specific database needs
- **Current_Database** - Existing database solution
- **Deployment_Type** - Preferred deployment model
- **Expected_Contract_Value** - Estimated deal value in USD

## Industries Represented

The sample data covers diverse industries including:
- Technology
- Financial Services
- Healthcare
- Manufacturing
- Retail
- Energy
- Telecommunications
- Logistics
- Insurance
- Real Estate
- Consulting
- Media
- Defense
- Education
- Transportation
- Pharmaceuticals
- Maritime
- Construction

## Database Requirements

Each customer has specific database requirements such as:
- High Availability
- Low Latency
- Compliance (HIPAA, FERPA, FDA)
- Scalability
- Real-time Analytics
- Carrier Grade
- Global Distribution
- Claims Processing
- Property Management
- Client Data Management
- Content Management
- Secure Database
- Student Data Management
- Fleet Management
- Clinical Trials
- Vessel Tracking
- Patient Care
- Project Management
- AI/ML Database

## Usage

This sample data can be used for:
- Sales pipeline analysis
- Customer segmentation
- Database requirement analysis
- Sales forecasting
- Marketing campaign planning
- Product development insights

## Data Format

The data is provided in both CSV and JSON formats for flexibility:
- **CSV**: Suitable for spreadsheet applications and data analysis tools
- **JSON**: Suitable for API integration and programmatic access

## Notes

- All customer names are fictional and based on the customers.txt file
- Contact information and addresses are fictional
- Revenue and employee counts are realistic estimates
- Database requirements are based on typical enterprise needs
- Sales stages follow standard Salesforce pipeline methodology 
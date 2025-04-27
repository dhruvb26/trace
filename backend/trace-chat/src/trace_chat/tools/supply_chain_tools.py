from typing import Dict, Any
from crewai.tools import tool


@tool("inventory_check")
def check_inventory(query: str) -> Dict:
    """Check current inventory levels for materials and products

    Args:
        query: A string describing what inventory to check, e.g., "all", "raw_materials", "finished_products"
    """
    # Simulated inventory data
    inventory = {
        "raw_materials": {
            "organic_cotton": 1000,
            "recycled_polyester": 500,
            "sustainable_wool": 300,
            "conventional_cotton": 800,  # New non-sustainable material
        },
        "finished_products": {"t_shirts": 200, "jackets": 150, "pants": 100},
    }

    # Return filtered inventory based on query if specified
    query = query.lower() if query else "all"
    if query == "all":
        return inventory
    elif query == "raw_materials" and "raw_materials" in inventory:
        return {"raw_materials": inventory["raw_materials"]}
    elif query == "finished_products" and "finished_products" in inventory:
        return {"finished_products": inventory["finished_products"]}
    else:
        # Try to find specific material match
        for category, items in inventory.items():
            for item, quantity in items.items():
                if query in item.lower():
                    return {category: {item: quantity}}

        # Default return all if no match
        return inventory


@tool("order_management")
def place_order(order_info: str) -> Dict:
    """Place and track orders for materials or products

    Args:
        order_info: Order information in the format "material_name quantity" (e.g., "organic_cotton 500")
    """
    # Parse order info
    parts = order_info.split()
    if len(parts) >= 2:
        material = parts[0]
        try:
            quantity = int(parts[1])
        except ValueError:
            quantity = 100  # Default quantity if parsing fails
    else:
        material = order_info if order_info else "organic_cotton"
        quantity = 100  # Default quantity

    # Simulated order processing
    supplier = (
        "EcoTextiles Ltd."
        if "organic" in material or "recycled" in material or "sustainable" in material
        else "FastFiber Inc."
    )

    return {
        "order_id": "ORD123",
        "status": "placed",
        "details": {"material": material, "quantity": quantity, "supplier": supplier},
        "estimated_delivery": "2024-04-15",
    }


@tool("email_supplier")
def email_supplier(email_content: str) -> Dict:
    """Send an email to the supplier regarding concerns or inquiries

    Args:
        email_content: The content of the email to send
    """
    try:
        # Prepare email data
        to_recipient = (
            "dk.bansal0026@gmail.com"  # Replace with actual supplier email in production
        )
        subject = "Patagonia: Sustainability Inquiry"
        message_text = email_content

        # Get SMTP settings
        SMTP_SERVER = "smtp.gmail.com"
        SMTP_PORT = 465
        SMTP_USERNAME = "kanavg004@gmail.com"
        SMTP_PASSWORD = "nszh xykq hltx jacq"

        # Send the email using SMTP with SSL
        import ssl
        import smtplib

        # Construct basic email message
        message = f"Subject: {subject}\n\n{message_text}"

        # Create SSL context
        context = ssl.create_default_context()

        # Use SMTP_SSL which uses SSL from the beginning
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_USERNAME, to_recipient, message)

        return {
            "status": "sent",
            "message": "Email sent to supplier successfully",
            "details": {"to": to_recipient, "subject": subject},
        }

    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to send email: {str(e)}",
            "details": email_content,
        }


@tool("email_patagonia_sustainability_team")
def email_sustainability_team(report_content: str) -> Dict:
    """Send an email to Patagonia's sustainability team with findings and concerns

    Args:
        report_content: The content of the email with sustainability concerns
    """
    return {
        "status": "sent",
        "message": "Report sent to Patagonia sustainability team",
        "team_response": "Thank you for flagging these issues. We take our sustainability commitments very seriously and will investigate these discrepancies immediately. Please provide any additional evidence you have collected.",
    }


@tool("sustainability_metrics")
def get_sustainability_metrics(material: str) -> Dict:
    """Track and report sustainability metrics for materials as reported by suppliers

    Args:
        material: The material to get sustainability metrics for
    """
    # Simulated sustainability data as reported by suppliers
    all_metrics = {
        "organic_cotton": {
            "water_usage": "45L per kg",
            "carbon_footprint": "2.1kg CO2 per unit",
            "recycled_content": "0%",
            "certification": "Global Organic Textile Standard",
            "supplier": "EcoTextiles Ltd.",
        },
        "recycled_polyester": {
            "water_usage": "20L per kg",
            "carbon_footprint": "1.8kg CO2 per unit",
            "recycled_content": "85%",
            "certification": "Global Recycled Standard",
            "supplier": "EcoTextiles Ltd.",
        },
        "sustainable_wool": {
            "water_usage": "50L per kg",
            "carbon_footprint": "2.5kg CO2 per unit",
            "recycled_content": "0%",
            "certification": "Responsible Wool Standard",
            "supplier": "EcoTextiles Ltd.",
        },
        "conventional_cotton": {
            "water_usage": "80L per kg",
            "carbon_footprint": "5.5kg CO2 per unit",
            "recycled_content": "0%",
            "certification": "None",
            "supplier": "FastFiber Inc.",
        },
    }

    # Return metrics for the specified material or a generic one if not found
    return all_metrics.get(
        material.lower(),
        {
            "water_usage": "Unknown",
            "carbon_footprint": "Unknown",
            "recycled_content": "Unknown",
            "certification": "Unknown",
            "supplier": "Unknown",
        },
    )


@tool("verify_supplier_compliance")
def verify_supplier_compliance(supplier_name: str) -> Dict:
    """Conduct an audit of supplier's actual sustainability practices vs. reported metrics

    Args:
        supplier_name: The name of the supplier to verify
    """
    suppliers = {
        "ecotextiles ltd.": {
            "compliance_status": "Investigation Required",
            "issues_found": [
                "Actual water usage for 'organic cotton' measured at 120L per kg (reported: 45L)",
                "Evidence of conventional cotton mixed with organic supplies",
                "Workers reported poor labor conditions during anonymous survey",
                "Carbon footprint measurements exceed reported values by 40%",
            ],
            "patagonia_standards_met": False,
            "last_audit_date": "2023-11-15",
            "recommended_action": "Flag for immediate review and supplier meeting",
        },
        "fastfiber inc.": {
            "compliance_status": "Non-Compliant",
            "issues_found": [
                "No sustainability certifications despite claims",
                "Uses harmful chemicals prohibited by Patagonia standards",
                "No transparency in supply chain",
                "Extremely high water usage",
            ],
            "patagonia_standards_met": False,
            "last_audit_date": "2023-10-20",
            "recommended_action": "Discontinue relationship and find alternative suppliers",
        },
    }

    return suppliers.get(
        supplier_name.lower(),
        {
            "compliance_status": "Unknown Supplier",
            "issues_found": [],
            "patagonia_standards_met": False,
            "last_audit_date": "Never",
            "recommended_action": "Conduct initial compliance assessment",
        },
    )


@tool("get_patagonia_sustainability_requirements")
def get_sustainability_requirements() -> Dict:
    """Get Patagonia's official sustainability requirements for suppliers

    Args:
        None
    """
    return {
        "environmental_standards": [
            "100% truthful reporting of resource usage and emissions",
            "Water usage below industry average for all materials",
            "Certified organic for all natural fibers",
            "No harmful chemicals from Patagonia's restricted substances list",
            "Minimum 50% recycled content for synthetic materials",
            "Transparent supply chain with full traceability",
        ],
        "social_standards": [
            "Fair wages for all workers in the supply chain",
            "Safe working conditions meeting international standards",
            "No child labor or forced labor",
            "Freedom of association for workers",
            "Community investment programs",
        ],
        "certification_requirements": [
            "Global Organic Textile Standard (GOTS) for organic materials",
            "Global Recycled Standard (GRS) for recycled materials",
            "bluesign® system partner for chemical management",
            "Fair Trade certification preferred",
        ],
        "compliance_process": "Annual audits with quarterly check-ins, immediate reporting of any standards violations, corrective action plans with clear timelines",
    }


def get_tools():
    """Returns a list of tools that can be used by agents"""
    return [
        check_inventory,
        place_order,
        get_sustainability_metrics,
        email_supplier,
        email_sustainability_team,
        verify_supplier_compliance,
        get_sustainability_requirements,
    ] 

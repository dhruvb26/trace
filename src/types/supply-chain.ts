export interface SupplyChainData {
  materials_source: {
    primary_fabric: string
    source_details: string
    remarks: string
  }
  manufacturing_locations: {
    factories: string
    remarks: string
  }
  transportation: {
    methods: string
    remarks: string
  }
  sustainability_initiatives: string[]
  certifications: string[]
  carbon_footprint_estimate: {
    value: string
    remarks: string
  }
}

export interface ProductData {
  result: {
    product_name: string
    company: string
    sustainability_score: number
    scraped_data: string
    supply_chain_data: {
      ai_response: string
      parsing_error: string | null
    }
    score_explanation: string
  }
}

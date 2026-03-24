export interface PropertyConfig {
  assistantName: string
  accentColor: string
  accentHover: string
  defaultLanguage: 'en' | 'es' | 'auto'
  propertyLabel: string
  locationLabel: string
  bubbleRadius: string
}

export const PROPERTY_CONFIGS: Record<string, PropertyConfig> = {
  lavalise: {
    assistantName: 'Lucia',
    accentColor: '#9C7B2F',
    accentHover: '#B8922F',
    defaultLanguage: 'en',
    propertyLabel: 'LA VALISE',
    locationLabel: 'Namron Collection · Mexico City',
    bubbleRadius: '4px'
  },
  condesadf: {
    assistantName: 'Melissa',
    accentColor: '#5B7B8A',
    accentHover: '#6E8E9E',
    defaultLanguage: 'en',
    propertyLabel: 'CONDESA DF',
    locationLabel: 'Mexico City',
    bubbleRadius: '8px'
  },
  ahau: {
    assistantName: 'Nina',
    accentColor: '#7A5C2E',
    accentHover: '#8E6A35',
    defaultLanguage: 'es',
    propertyLabel: 'AHAU COLLECTION',
    locationLabel: 'Tulum',
    bubbleRadius: '12px'
  },
  demo: {
    assistantName: 'Sofía',
    accentColor: '#C96A3A',
    accentHover: '#D4784A',
    defaultLanguage: 'auto',
    propertyLabel: 'CASA AURELIA',
    locationLabel: 'San Miguel de Allende',
    bubbleRadius: '8px'
  }
}

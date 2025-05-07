import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import formation from './formation'
import resource from './resource'
import testimonial from './testimonial'
import civilSociety from './civilSociety'
import gallery from './gallery'

export const schemaTypes = [
  // Default schema types
  post, 
  author, 
  category, 
  blockContent,
  
  // Custom schema types for FPRA website
  formation,
  resource,
  testimonial,
  civilSociety,
  gallery,
]

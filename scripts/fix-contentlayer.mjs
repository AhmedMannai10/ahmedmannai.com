import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

function fixAssertSyntax(dir) {
  try {
    const files = readdirSync(dir, { withFileTypes: true })
    
    for (const file of files) {
      const fullPath = join(dir, file.name)
      
      if (file.isDirectory()) {
        fixAssertSyntax(fullPath)
      } else if (file.name.endsWith('.mjs')) {
        let content = readFileSync(fullPath, 'utf-8')
        const originalContent = content
        
        // Replace assert { type: 'json' } with with { type: 'json' }
        content = content.replace(/assert\s*{\s*type:\s*['"]json['"]\s*}/g, "with { type: 'json' }")
        
        if (content !== originalContent) {
          writeFileSync(fullPath, content, 'utf-8')
          console.log(`Fixed: ${fullPath}`)
        }
      }
    }
  } catch (error) {
    // Directory might not exist yet, that's okay
    if (error.code !== 'ENOENT') {
      console.error(`Error processing ${dir}:`, error.message)
    }
  }
}

// Fix contentlayer generated files
const contentlayerDir = join(process.cwd(), '.contentlayer', 'generated')
fixAssertSyntax(contentlayerDir)
console.log('Contentlayer assert syntax fixed!')


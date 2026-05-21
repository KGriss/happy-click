pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/**
 * Loads and renders a specific PDF to a specific canvas
 * @param {string} url - Path to the PDF
 * @param {string} canvasId - ID of the canvas element
 */
async function renderPDF(url, canvasId) {
  try {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Load the document
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;

    // Get the first page
    const page = await pdf.getPage(1);
    
    // Set scale (adjust as needed for your grid layout)
    const viewport = page.getViewport({ scale: 1.0 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render into the context
    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    console.log(`Rendered: ${url}`);
  } catch (error) {
    console.error(`Error rendering ${url}:`, error);
  }
}

// Initialize all PDFs at once
renderPDF('resources/Questionnaire Interactif enseignants – Enjeux du numérique à l’école.pdf', 'pdf-1');
renderPDF('resources/test_version_finale_wtff___.pdf', 'pdf-2');
//renderPDF('./report.pdf', 'pdf-2');
//renderPDF('./report.pdf', 'pdf-2');

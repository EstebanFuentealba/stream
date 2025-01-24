export async function onRequest(context) {
    // URL del recurso en Google Cloud Storage
    const url = "https://storage.googleapis.com/stream-models/ggml-model-whisper-base-q5_1.bin";
  
    try {
      // Hacer la solicitud al recurso remoto
      const response = await fetch(url);
  
      if (!response.ok) {
        // Si el recurso remoto responde con error, devolver el error
        return new Response("Error al obtener el recurso", { status: response.status });
      }
  
      // Crear una nueva respuesta con las cabeceras adecuadas
      const proxyResponse = new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
          "Content-Disposition": 'attachment; filename="ggml-base.bin"', // Forzar descarga
          "Cache-Control": "public, max-age=3600", // Control de caché
        },
      });
  
      return proxyResponse;
    } catch (error) {
      // Manejo de errores generales
      return new Response("Error en el proxy: " + error.message, { status: 500 });
    }
  }
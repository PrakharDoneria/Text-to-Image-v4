import { delay } from "https://deno.land/std@0.128.0/async/delay.ts";
import { serve } from "https://deno.land/std@0.128.0/http/server.ts";

async function generateImage(prompt) {
  const baseUrl = "https://getvalue-c3xm7vpfca-uc.a.run.app/?prompt=";
  const negativePrompt = "anime, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured";
  const url = `${baseUrl}${encodeURIComponent(prompt)}%20photo%20${encodeURIComponent(prompt)}.%20highly%20detailed,%20high%20budget,%20highly%20details%20,%20epic%20,%20high%20quality&negative_prompt=${negativePrompt}&width=819&height=819&steps=15&cfg=8&seed=-1`;

  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Failed to generate image. Status code: ${response.status}`);
    return null;
  }

  const responseData = await response.json();
  return responseData.job;
}

async function retrieveImage(jobId) {
  const baseUrl = "https://getimage-c3xm7vpfca-uc.a.run.app/?id=";
  const url = `${baseUrl}${jobId}`;

  while (true) {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to retrieve image. Status code: ${response.status}`);
      return null;
    }

    const responseData = await response.json();

    if (responseData.imageUrl) {
      return responseData.imageUrl;
    }

    await delay(2000);
  }
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const prompt = url.searchParams.get("prompt");

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const jobId = await generateImage(prompt);
  if (!jobId) {
    return new Response(JSON.stringify({ error: "Image generation failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log(`Job ID: ${jobId}`);

  const imageUrl = await retrieveImage(jobId);
  if (imageUrl) {
    return new Response(JSON.stringify({ img_url: imageUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "Failed to retrieve the image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

console.log("HTTP webserver running. Access it at: http://localhost:8000/");
serve(handleRequest, { port: 8000 });

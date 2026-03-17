# Aura Assistant (Vercel)

Frontend (HTML/CSS/JS e assets) e backend (função serverless) vivem no mesmo repositório e podem ser deployados juntos no Vercel:

1. **Configurar**  
   - Crie um projeto Vercel apontando para este repositório.  
   - Defina `OPENAI_API_KEY` como Environment Variable protegida no dashboard.
2. **Rodar localmente**  
   - Instale dependências (`npm install`).  
   - Execute `npx vercel dev` ou `npm run dev` para testar o frontend estático e a rota `POST /api/assistant`.
3. **Lógica do backend**  
   - A função em `api/assistant.js` valida `skinType`, `concern`, usa a chave da OpenAI e chama `chat/completions`.  
   - O frontend chama `/api/assistant` via `fetch` em `script.js`, então o domínio principal e a função ficam alinhados no mesmo deploy.

Ao subir, o Vercel serve os arquivos estáticos na raiz e a API na pasta `/api`, então tudo funciona sem servidor dedicado. Use `vercel --prod` e depois teste o assistente para garantir que o backend acessa a OpenAI corretamente.

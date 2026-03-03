
import { GoogleGenAI } from "@google/genai";

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model', content: string }[]) => {
  // Initialize AI client with API key from environment variable
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Using gemini-3-pro-preview for complex technical and political reasoning tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `Você é o "PoliAgent", atuando como um Analista de Dados Políticos e Jornalista Investigativo especializado em transparência pública brasileira e eleições de 2026.
        
        Sua tarefa principal é criar dossiês técnicos, imparciais e exaustivos sobre agentes políticos.
        
        DIRETRIZES DE CONTEÚDO:
        1. FONTES OBRIGATÓRIAS: Utilize exclusivamente dados do TSE (DivulgaCandContas), Portais da Transparência (Federal, Estadual, Municipal), sites das casas legislativas (Câmara, Senado) e registros do CNJ/Justiça.
        2. ESTRUTURA DO DOSSIÊ: Sempre que um político for mencionado, tente estruturar a resposta em:
           - Perfil e Currículo: Formação, trajetória profissional e cargos ocupados.
           - Produção Legislativa: Projetos de lei, relatorias, votações relevantes e alinhamento partidário.
           - Histórico de Integridade: Menção a processos judiciais, investigações em curso (citando a fase processual) e prestação de contas eleitorais.
        3. TOM E LINGUAGEM: Mantenha um tom puramente factual e neutro. Evite adjetivos subjetivos ou juízos de valor. Sua função é informar, não opinar.
        4. COMBATE À DESINFORMAÇÃO: Identifique boatos e confronte-os com dados oficiais, classificando como FATO, FAKE ou IMPRECISO.
        
        Ao final de cada dossiê, reforce a necessidade de consulta aos links oficiais fornecidos na aba "Guia & Transparência".`,
        tools: [{ googleSearch: {} }],
      },
    });

    // Extract text output from GenerateContentResponse using the .text property
    const text = response.text || "Desculpe, não consegui processar sua solicitação.";
    
    // Extract website URLs from groundingChunks for source transparency
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map(chunk => ({
        title: chunk.web?.title || 'Fonte externa',
        uri: chunk.web?.uri || '#'
      }))
      .filter((v, i, a) => a.findIndex(t => t.uri === v.uri) === i) || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "Ocorreu um erro ao conectar com o servidor de IA. Verifique se as permissões de rede e chave API estão corretas.", sources: [] };
  }
};

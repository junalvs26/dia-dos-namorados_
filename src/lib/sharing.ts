import type { MuseumConfig } from '../types';

/**
 * Codifica o objeto MuseumConfig em uma string Base64 compacta e segura para URLs.
 * Suporta caracteres Unicode (acentos, emojis).
 */
export function serializeConfig(config: MuseumConfig): string {
  try {
    const jsonString = JSON.stringify(config);
    // encodeURIComponent + unescape garante suporte completo a acentuação e emojis no atob/btoa
    const base64 = btoa(unescape(encodeURIComponent(jsonString)));
    // Torna a string "URL-safe" substituindo caracteres especiais do Base64 padrão
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (error) {
    console.error('Falha ao serializar configuração:', error);
    return '';
  }
}

/**
 * Decodifica a string Base64 "URL-safe" de volta para o objeto MuseumConfig.
 */
export function deserializeConfig(safeBase64: string): MuseumConfig | null {
  if (!safeBase64) return null;
  try {
    // Restaura os caracteres originais do Base64
    let base64 = safeBase64.replace(/-/g, '+').replace(/_/g, '/');
    // Adiciona o preenchimento de '=' se necessário
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonString = decodeURIComponent(escape(atob(base64)));
    const parsed = JSON.parse(jsonString);
    
    // Validação básica do formato
    if (parsed && typeof parsed === 'object' && parsed.partner1 && parsed.partner2) {
      return parsed as MuseumConfig;
    }
    return null;
  } catch (error) {
    console.error('Falha ao deserializar configuração:', error);
    return null;
  }
}

/**
 * Gera um ID único curto para armazenamento local
 */
export function generateLocalId(): string {
  return 'museum_' + Math.random().toString(36).substring(2, 11);
}

import { Livro } from '../types/Livro';

export async function buscarLivrosAPI(termo: string): Promise<Livro[]> {
  if (termo.trim() === '') {
    throw new Error('Digite um termo para buscar.');
  }

  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termo)}`);
  const data = await response.json();

  const livros: Livro[] = (data.items || []).map((item: any) => ({
    id: item.id,
    volumeInfo: {
      title: item.volumeInfo?.title || 'Sem título',
      authors: item.volumeInfo?.authors,
      infoLink: item.volumeInfo?.infoLink,
    },
  }));

  return livros;
}

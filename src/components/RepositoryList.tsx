import { useState, useEffect } from 'react';
import { RepositoryItem } from './RepositoryItem';
import '../styles/repositories.scss';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  /**
   * Se array passado ao useEffect esta vazio soh vai executar uma vez.
   * Cuidado se nao tiver parametro (sem , []) entra em loop infinito */
  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos') // https://api.github.com/users/victorhm7/repos
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        {repositories.map((repository) => {
          return (
            <RepositoryItem key={repository.name} repository={repository} />
          );
        })}
      </ul>
    </section>
  );
}

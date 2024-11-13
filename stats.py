import requests
import os

def get_repo_stats():
    token = os.getenv("GITHUB_TOKEN")  # Obtener el token del entorno
    headers = {"Authorization": f"token {token}"}
    
    # Asegúrate de cambiar TU_USUARIO y TU_REPOSITORIO al nombre correcto
    url = "https://api.github.com/repos/Luishp0/AcuaCodeMovil"
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        print(f"Stars: {data['stargazers_count']}")
        print(f"Forks: {data['forks_count']}")
        print(f"Open Issues: {data['open_issues_count']}")
    else:
        print("Failed to fetch data from GitHub API")

get_repo_stats()

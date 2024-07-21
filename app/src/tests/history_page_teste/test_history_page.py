import traceback
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def login(driver):
    # Navegue para a página inicial
    driver.get("http://localhost:3000")  # Substitua pela URL da sua página inicial
    print("Navegou para a página inicial.")

    # Aguarde e clique no botão de login
    try:
        login_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, '//button[contains(text(), "Login")]'))  # Ajuste o seletor para o botão de login
        )
        login_button.click()
        print("Botão de login clicado.")
    except Exception as e:
        print(f"Não foi possível encontrar o botão de login: {e}")
        driver.save_screenshot('screenshot_login_button.png')  # Salve uma captura de tela para depuração

    # Aguarde o modal de login ser exibido
    try:
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.MuiModal-root'))
        )
        print("Modal de login exibido.")
    except Exception as e:
        print(f"Não foi possível encontrar o modal de login: {e}")
        driver.save_screenshot('screenshot_login_modal.png')  # Salve uma captura de tela para depuração

    # Encontre os campos de entrada e o botão de login no modal
    try:
        username_input = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.ID, 'username'))  # Ajuste conforme necessário
        )
        password_input = driver.find_element(By.ID, 'senha')  # Ajuste conforme necessário
        
        # Aguarde o botão de login no modal ser clicável
        submit_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, '//button[contains(text(), "Login")]'))
        )

        # Envie as credenciais e clique no botão de login
        username_input.send_keys("admin")  # Substitua pelo seu nome de usuário
        password_input.send_keys("admin")  # Substitua pela sua senha
        submit_button.click()
        print("Credenciais enviadas e login realizado.")
    except Exception as e:
        print(f"Erro ao encontrar ou interagir com os campos de login: {e}")
        driver.save_screenshot('screenshot_login_fields.png')  # Salve uma captura de tela para depuração

    # Aguarde a autenticação e a navegação para a página protegida
    try:
        WebDriverWait(driver, 20).until(
            EC.url_to_be("http://localhost:3000/historico")  # URL da página protegida após login
        )
        print("Navegado para a página protegida.")
    except Exception as e:
        print(f"Não foi possível navegar para a página protegida: {e}")
        driver.save_screenshot('screenshot_protected_page.png')  # Salve uma captura de tela para depuração

def test_history_page():
    driver = None
    try:
        # Configuração do WebDriver
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service)

        # Faça login antes de acessar a página protegida
        login(driver)

        # Agora acesse a página protegida
        driver.get("http://localhost:3000/historico")  # Substitua pela URL real da sua página
        print("Navegou para a página de histórico.")

        # Aguarde a página carregar e verifique o título da página
        try:
            print("Aguardando o título da página ser 'Vota Ai'...")
            WebDriverWait(driver, 20).until(
                EC.title_is("Vota Ai")  # Ajuste o título conforme necessário
            )
            assert driver.title == "Vota Ai", "O título da página está incorreto."
            print("Título da página verificado com sucesso.")
        except Exception as e:
            print(f"Erro ao verificar o título da página: {e}")
            driver.save_screenshot('screenshot_page_title.png')  # Salve uma captura de tela para depuração

        # Verifique se o campo de filtro está visível e selecione uma opção
        try:
            print("Aguardando o campo de filtro...")
            filter_dropdown = WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '#demo-controlled-open-select'))
            )
            assert filter_dropdown.is_displayed(), "O campo de filtro não está visível."
            print("Campo de filtro encontrado e visível.")

            # Clique no filtro e selecione uma opção
            filter_dropdown.click()
            print("Aguardando opções do filtro...")
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.XPATH, "//li[contains(text(), 'Finalizadas')]"))
            ).click()
            print("Opção 'Finalizadas' selecionada.")

            # Aguarde e verifique se a tabela é atualizada com o filtro
            print("Aguardando a tabela ser atualizada...")
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'table tbody tr'))
            )
            rows = driver.find_elements(By.CSS_SELECTOR, 'table tbody tr')
            for row in rows:
                status = row.find_element(By.CSS_SELECTOR, 'td:nth-child(1)').text
                assert status == 'CLOSED', "A tabela não está filtrada corretamente."
            print("Tabela filtrada corretamente.")
        except Exception as e:
            print(f"Erro ao interagir com o filtro ou a tabela: {e}")
            driver.save_screenshot('screenshot_filter_table.png')  # Salve uma captura de tela para depuração

        # Verifique se o modal (se houver) é exibido ao editar uma célula
        try:
            print("Verificando a edição da célula...")
            first_cell = WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'table tbody tr td:nth-child(3) input'))
            )
            first_cell.click()
            first_cell.send_keys("Novo Título")
            assert first_cell.get_attribute('value') == "Novo Título", "A edição da célula não funcionou corretamente."
            print("Edição da célula verificada com sucesso.")
        except Exception as e:
            print(f"Erro ao editar a célula: {e}")
            driver.save_screenshot('screenshot_cell_edit.png')  # Salve uma captura de tela para depuração

        # Verifique se a navegação da tabela funciona corretamente
        try:
            print("Verificando a navegação da tabela...")
            pagination = WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '.MuiTablePagination-select'))
            )
            pagination.click()
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.XPATH, "//li[contains(text(), '25')]"))
            ).click()
            print("Número de linhas por página alterado para 25.")

            # Aguarde a página ser atualizada com a nova configuração
            time.sleep(2)  # Aguarde um pouco para garantir que a página seja atualizada

            # Verifique se a tabela foi atualizada com o novo número de linhas por página
            rows_per_page = driver.find_elements(By.CSS_SELECTOR, 'table tbody tr')
            assert len(rows_per_page) <= 25, "O número de linhas por página não foi atualizado corretamente."
            print("Número de linhas por página verificado com sucesso.")
        except Exception as e:
            print(f"Erro ao verificar a navegação da tabela: {e}")
            driver.save_screenshot('screenshot_pagination.png')  # Salve uma captura de tela para depuração

    except Exception as e:
        print(f"Exception occurred: {e}")
        traceback.print_exc()  # Imprime o traceback completo da exceção
        driver.save_screenshot('screenshot_general.png')  # Salve uma captura de tela para depuração
    finally:
        if driver:
            driver.quit()

# Executar o teste
if __name__ == "__main__":
    test_history_page()

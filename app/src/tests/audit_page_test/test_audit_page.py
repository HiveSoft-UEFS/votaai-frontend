from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_audit_page():
    try:
        # Configuração do WebDriver
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service)
   
        driver.get("http://localhost:3000/auditoria")  # Substitua pela URL real da sua página

        # Aguarde a página carregar
        audit_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".audit-input"))
        )
        assert audit_input.is_displayed(), "O campo de entrada de auditoria não está visível."

        # Envie um código para auditoria
        audit_input.send_keys("hash1")
        audit_button = driver.find_element(By.CSS_SELECTOR, ".audit-button")
        audit_button.click()

        # Aguarde a resposta
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".MuiModal-root"))
        )

        # Verifique se o modal é exibido
        modal = driver.find_element(By.CSS_SELECTOR, ".MuiModal-root")
        assert modal.is_displayed(), "O modal não está visível."

        # Verifique o conteúdo do modal
        modal_title = driver.find_element(By.CSS_SELECTOR, "#modal-modal-title")
        assert modal_title.text == "Informações da Participação", "Título do modal incorreto."

        # Verifique se o botão de fechar está presente e clicável
        close_button = driver.find_element(By.CSS_SELECTOR, ".MuiButton-contained")
        assert close_button.is_displayed(), "O botão de fechar não está visível."
        close_button.click()

        # Verifique se o modal foi fechado
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.CSS_SELECTOR, ".MuiModal-root"))
        )

    except Exception as e:
        print(f"Exception occurred: {e}")
        driver.save_screenshot('screenshot.png')  # Salve uma captura de tela para depuração
    finally:
        driver.quit()

# Executar o teste
if __name__ == "__main__":
    test_audit_page()

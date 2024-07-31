import win32print
import win32ui
import win32con
import sys

def print_text(text):
    print("Iniciando la impresión...")

    # Obtener la impresora
    try:
        printer_info = win32print.OpenPrinter("Generic")
        print("Impresora abierta correctamente.")
    except Exception as e:
        print(f"Error al abrir la impresora: {e}")
        return

    try:
        # Configurar el trabajo de impresión
        job_id = win32print.StartDocPrinter(printer_info, 1, ("Test Print", None, "RAW"))
        win32print.StartPagePrinter(printer_info)
        print("Trabajo de impresión iniciado.")

        # Crear un contexto de dispositivo para la impresora
        hdc = win32ui.CreateDC()
        hdc.CreatePrinterDC("Generic")

        # Establecer el tamaño del papel (ajusta según el tamaño del rollo)
        hdc.SetMapMode(win32con.MM_TWIPS)
        hdc.SetViewportExt((80 * 1440, 0))  # Para papel de 80 mm de ancho
        print("Contexto de dispositivo creado y tamaño de papel establecido.")

        # Decodificar el texto para manejar correctamente los caracteres especiales
        decoded_text = text.encode('utf-8').decode('unicode_escape')

        # Añadir saltos de línea adicionales al final para permitir el corte del papel
        decoded_text += '\n\n\n\n\n\n\n'  # 5 saltos de línea adicionales

        # Escribir texto en la página, manejando los saltos de línea
        for line in decoded_text.split('\\n'):
            win32print.WritePrinter(printer_info, (line + '\n').encode('utf-8'))
        print(f"Texto enviado a la impresora:\n{decoded_text}")

        # Finalizar la página y el documento
        win32print.EndPagePrinter(printer_info)
        win32print.EndDocPrinter(printer_info)
        print("Página y documento finalizados.")
    except Exception as e:
        print(f"Error durante la impresión: {e}")
    finally:
        # Cerrar la impresora
        win32print.ClosePrinter(printer_info)
        print("Impresora cerrada.")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(f"Texto recibido:\n{sys.argv[1]}")
        print_text(sys.argv[1])
    else:
        print("No se proporcionó ningún texto para imprimir.")

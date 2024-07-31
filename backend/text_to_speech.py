from gtts import gTTS
import sys
import os

def text_to_speech(text):
    # Crear un objeto gTTS con el texto
    tts = gTTS(text=text, lang='es')
    # Guardar el archivo de audio
    audio_file = "output.mp3"
    tts.save(audio_file)
    return audio_file

if __name__ == "__main__":
    if len(sys.argv) > 1:
        text = sys.argv[1]
        audio_file = text_to_speech(text)
        print(f"Archivo de audio guardado en {audio_file}")
    else:
        print("Por favor, proporciona el texto a convertir en voz.")

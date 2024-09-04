
import PyPDF2

file = open(r"guide.pdf", "rb")

pdf = PyPDF2.PdfReader(file)

page = pdf.pages[1]

text = page.extract_text()

for p in text.split("\n\n"):
    print("Paragraph:", p)
    
file.close()
import os
import urllib.request

companies = {
    "tcs": "tcs.com",
    "infosys": "infosys.com",
    "capgemini": "capgemini.com",
    "persistent": "persistent.com",
    "techm": "techmahindra.com",
    "amdocs": "amdocs.com",
    "atlas": "atlascopco.com",
    "shapoorji": "sp-group.co.in",
    "hitachi": "hitachi.com",
    "cognizant": "cognizant.com",
    "wipro": "wipro.com",
    "hexaware": "hexaware.com",
    "ibm": "ibm.com",
    "lt": "larsentoubro.com",
    "tatamotors": "tatamotors.com",
    "bajaj": "bajajauto.com",
    "kirloskar": "kirloskar.com",
    "hsbc": "hsbc.com",
    "linde": "linde.com",
    "tejas": "tejasnetworks.com",
    "praj": "prajindustries.com",
    "faurecia": "forvia.com",
    "uno": "unominda.com",
    "bajajelec": "bajajelectricals.com",
    "cyient": "cyient.com"
}

def download_logos():
    os.makedirs("public/images/recruiters", exist_ok=True)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    
    for key, domain in companies.items():
        url = f"https://logo.clearbit.com/{domain}"
        dest = f"public/images/recruiters/{key}.png"
        
        print(f"Downloading {key} logo from {url}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as response, open(dest, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Successfully saved {dest}")
        except Exception as e:
            print(f"Error downloading {key} logo: {e}")

if __name__ == "__main__":
    download_logos()

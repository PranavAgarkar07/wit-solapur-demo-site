import hashlib
import urllib.request
import time

# We list all variations to find the correct ones
variations = {
    "tcs": ["TATA_Consultancy_Services_Logo.svg"],
    "infosys": ["Infosys_logo.svg"],
    "capgemini": ["Capgemini_201x_logo.svg", "Capgemini_logo_2017.svg"],
    "persistent": ["Persistent_Systems_Logo.svg", "Persistent_Systems_logo.svg"],
    "techm": ["Tech_Mahindra_New_Logo.svg", "Tech_Mahindra_logo.svg", "Tech_Mahindra_New_Logo.png"],
    "amdocs": ["Amdocs_logo.svg"],
    "atlas": ["Atlas_Copco_logo.svg", "Atlas_Copco_logo.png"],
    "shapoorji": ["Shapoorji_Pallonji_Group_Logo.svg", "Shapoorji_Pallonji_Group_logo.png", "Shapoorji_Pallonji_logo.svg"],
    "hitachi": ["Hitachi_logo.svg"],
    "cognizant": ["Cognizant_logo_2022.svg", "Cognizant_Logo.svg", "Cognizant_logo.svg"],
    "wipro": ["Wipro_logo.svg", "Wipro_Logo.svg"],
    "hexaware": ["Hexaware_Technologies_logo.svg", "Hexaware_logo.svg"],
    "ibm": ["IBM_logo.svg"],
    "lt": ["Larsen_%26_Toubro_logo.svg", "L%26T_logo.svg", "Larsen_and_Toubro_logo.svg", "Larsen_and_Toubro_logo.png"],
    "tatamotors": ["Tata_Motors_logo.svg", "Tata_Motors_Logo.svg"],
    "bajaj": ["Bajaj_Auto_logo.svg", "Bajaj_logo.svg"],
    "kirloskar": ["Kirloskar_logo.svg", "Kirloskar_Logo.svg", "Kirloskar_Group_logo.svg"]
}

def check_logo(fn):
    fn_clean = fn.replace(" ", "_")
    h = hashlib.md5(fn_clean.encode('utf-8')).hexdigest()
    url = f"https://upload.wikimedia.org/wikipedia/commons/{h[0]}/{h[0:2]}/{fn_clean}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    
    try:
        req = urllib.request.Request(url, method='HEAD', headers=headers)
        with urllib.request.urlopen(req) as resp:
            if resp.status == 200:
                return url
    except Exception as e:
        # If it's a 429, wait and retry
        if "429" in str(e):
            print(f"    Throttled on {fn_clean}. Sleeping for 5s and retrying...")
            time.sleep(5)
            return check_logo(fn)
    return None

def test_variations():
    results = {}
    for company, files in variations.items():
        print(f"Checking for {company}...")
        found = False
        for fn in files:
            time.sleep(1.5) # Throttling prevention
            url = check_logo(fn)
            if url:
                print(f"  FOUND: {fn} -> {url}")
                results[company] = url
                found = True
                break
        if not found:
            print(f"  NOT FOUND: {company}")
            
    print("\n--- FINAL FINDINGS ---")
    for c, url in results.items():
        print(f"'{c}': '{url}',")

if __name__ == "__main__":
    test_variations()

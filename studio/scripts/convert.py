import json
import csv
import tarfile

with tarfile.open('production-backup.tar.gz') as tar, open('products.csv', 'w', newline='') as out:
    writer = csv.writer(out)
    writer.writerow(['Handle', 'Title', 'Variant Price'])
    for member in tar.getmembers():
        if member.name.endswith('.ndjson'):
            f = tar.extractfile(member)
            for line in f:
                doc = json.loads(line)
                if doc.get('_type') == 'product':
                    writer.writerow([
                        doc.get('handle', {}).get('current', ''),
                        doc.get('title', ''),
                        doc.get('price', ''),
                    ])

print('Done → products.csv')

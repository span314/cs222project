#!/usr/bin/python
#Python 2.7
#CS 222
#Converts a csv file into a JSON array

import csv
import json

#parameters to change
INPUT_FILE = "listings.csv"
OUTPUT_FILE = "listings1024.json"
MAX_ROWS = 1024
INDENT = True

with open(INPUT_FILE, "rU") as csv_file, open(OUTPUT_FILE, "w") as json_file:
  reader = csv.DictReader(csv_file)
  row_count = 0
  data = []
  for row in reader:
    for key, value in row.iteritems():
      #strip invalid characters
      row[key] = value.decode('utf-8', 'ignore').encode('utf-8').strip()
    data.append(row)
    row_count += 1
    if row_count >= MAX_ROWS:
      break
  if INDENT:
    json_file.write(json.dumps(data, indent=2))
  else:
    json_file.write(json.dumps(data, separators=(',', ':')))
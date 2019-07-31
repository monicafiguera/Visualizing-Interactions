#!/usr/bin/python
import os
import glob
import pandas as pd

# Check current working directory.
retval = os.getcwd()
print("Current working directory %s" % retval)

path = "./added_columns"
os.chdir(path)

extension = 'csv'
all_filenames = [i for i in glob.glob('*.{}'.format(extension))]


#combine all files in the list
combined_csv = pd.concat([pd.read_csv(f) for f in all_filenames ])

combined_csv = combined_csv.sort_values(by=['Prob'], ascending=False)

#export to csv
combined_csv.to_csv( "LapRLS_Similarity_combined.csv",  encoding='utf-8', index=False)
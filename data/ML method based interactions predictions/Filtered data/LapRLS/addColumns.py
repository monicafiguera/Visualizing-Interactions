import os
import glob
import pandas as pd

def read_csv(filename):
    df = pd.read_csv(filename)
    return df
 
def return_method_column(df, method_name):
    ML_method = []
    total_rows = len(df['Drug1'])
    for i in range(total_rows):
        ML_method.append(method_name)
    return ML_method

def saveFile(data, method_name, source_name, file_name):

    path = "./added_method_column_" + source_name + "/"
    #os.chdir(path)

    try:
        os.mkdir(path)
    except OSError:
        print ("Creation of the directory %s failed" % path)
    else:
        print ("Successfully created the directory %s " % path)


    file_name = path + method_name + "_" + file_name
    data.to_csv(file_name, encoding='utf-8', index=False)

def main():
    method_name = "LapRLS"

    data = []

    data.append({ "drug-enzyme": "drug-enzyme-filtered.csv" })
    data.append({ "drug-target": "drug-target-filtered.csv" })
    data.append({ "HPOSim": "HPOSim-filtered.csv" })
        
    for elem in data:
        for key,value in elem.items():
            source_name = key
            file_name = value

            df = pd.read_csv(file_name) 

            ML_method_column = return_method_column(df, method_name)
            df['Method'] = ML_method_column

            saveFile(df, method_name, source_name, file_name)


if __name__== "__main__":
    main()
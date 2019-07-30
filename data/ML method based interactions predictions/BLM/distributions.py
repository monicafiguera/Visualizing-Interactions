import os
import glob
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import math
import csv

def truncate(number, digits) -> float:
    stepper = 10.0 ** digits
    return math.trunc(stepper * number) / stepper

def read_csv(filename):
    df = pd.read_csv(filename)
    return df

def saveFilteredData(filteredData, interactionType):
    path = "./filtered/"

    try:
        os.mkdir(path)
    except OSError:
        print ("Creation of the directory %s failed" % path)
    else:
        print ("Successfully created the directory %s " % path)


    fileName = path + interactionType + "-filtered.csv"
    filteredData.to_csv(fileName, encoding='utf-8', index=False)

def main():
    DDI = "DDI_BLM_predictions.csv"
    NCRD = "NCRD_BLM_predictions.csv"
    CRD = "CRD_BLM_predictions.csv"
    WP4 = "wp4_drugs_drugs_interactions_BLM_predictions.csv"
    UMLS = "drug-side-effect_BLM_UMLS_predictions.csv"
    HPOSim = "drug-side-effect_BLM_HPOSim_predictions.csv"
    enzyme = "drug_enzyme_BLM_predictions.csv"
    target = "drug_target_BLM_predictions.csv"
    
    #df1 = pd.read_csv("interactions_combined.csv") # all interactions
    
    df1 = pd.read_csv(DDI)
    df2 = pd.read_csv(NCRD)
    df3 = pd.read_csv(CRD)
    df4 = pd.read_csv(WP4)
    df5 = pd.read_csv(UMLS)
    df6 = pd.read_csv(HPOSim)
    df7 = pd.read_csv(enzyme)
    df8 = pd.read_csv(target)

    dataFrames = [df1, df2, df3, df4, df5, df6, df7, df8]
    dataFramesNames = ["DDI", 
                       "NCRD", 
                       "CRD", 
                       "WP4", 
                       "UMLS", 
                       "HPOSim", 
                       "drug-enzyme",
                       "drug-target"]
                       
    # statistical shapes

    for i in range(8):
        print("**************** " + dataFramesNames[i] + " *******************")
        df = dataFrames[i]
        percentileValue = np.percentile(df["Prob"], 98)
        percentileValue = truncate(percentileValue, 4)

        print('Mean', df["Prob"].mean())
        print('Variance:', np.var(df["Prob"]))
        print('Standard Deviation', df["Prob"].std())
        print("98th percentile:", percentileValue)
        
        percCount = sum(j >= percentileValue for j in df["Prob"])
        print("Percentile count:", percCount)


        booleans = []
        for prob in df["Prob"]:
            if prob >= percentileValue:
                booleans.append(True)
            else:
                booleans.append(False)

        filtered = pd.Series(booleans)
        filteredData = df[filtered] 
        
        saveFilteredData(filteredData, dataFramesNames[i])

        # Probability that the prediction is a real interaction
        hist = filteredData["Prob"].hist(bins=10, histtype='bar', stacked=True)
        hist.set_xlabel("Probability")
        hist.set_ylabel("Frequency")

        plt.legend(dataFramesNames)
        plt.yscale("linear")


    plt.title("Drug interactions using BLM")
    plt.show()


if __name__== "__main__":
    main()
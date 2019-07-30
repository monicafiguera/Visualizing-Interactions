import os
import glob
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import math

def truncate(number, digits) -> float:
    stepper = 10.0 ** digits
    return math.trunc(stepper * number) / stepper

def read_csv(filename):
    df = pd.read_csv(filename)
    return df
 
def main():
    DDI = "DDI_combined.csv"
    CRD = "CRD_combined.csv"
    NCRD = "NCRD_combined.csv"
    WP4 = "WP4_combined.csv"
    UMLS = "drug_side_effects_umls_combined.csv"
    HPOSim = "drug_side_effects_hposim_combined.csv"
    enzyme = "drug_enzyme_combined.csv"
    target = "drug_target_combined.csv"

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

    # Statistical shapes

    newData = []
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
        print("Percentile count (interactions over 98th percentile):", percCount)

        booleans = []
        for prob in df["Prob"]:
            if prob >= percentileValue:
                booleans.append(True)
            else:
                booleans.append(False)

        filtered = pd.Series(booleans)
        filteredData = df[filtered] 
        newData.append(filteredData)


        # Probability that the prediction is a real interaction
        
        hist = filteredData["Prob"].hist(bins=10, histtype='bar', stacked=True)
        #hist = df["Prob"].hist(bins=10)
    
        hist.set_xlabel("Probability")
        hist.set_ylabel("Frequency")

        plt.legend(dataFramesNames)
        plt.yscale("linear")

    plt.title("Drug interactions at the 98th percentile")
    plt.show()


if __name__== "__main__":
    main()
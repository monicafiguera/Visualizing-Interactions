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
    DDI = "DDI_predictions_ranked.csv"
    NCRD = "NCRD_predictions_ranked.csv"
    CRD = "CRD_predictions_ranked.csv"
    WP4 = "DDI_PubMed_processed_predictions_ranked.csv"
    UMLS = "drug_side-effect_umls_ranked.csv"
    HPOSim = "drug_side-effect_hposim_ranked.csv"
    enzyme = "drug_enzyme_predictions_ranked.csv"
    target = "drug_target_predictions_ranked.csv"
    
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
        print("Percentile count:", percCount)


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
        hist.set_xlabel("Probability")
        hist.set_ylabel("Frequency")

        plt.legend(dataFramesNames)
        plt.yscale("linear")


    plt.title("Drug interactions using semEP")
    plt.show()


if __name__== "__main__":
    main()
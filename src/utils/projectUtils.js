
export function getFormattedProgressPercentage(fundingRaised, fundingGoal) {
    return Number(((Number(fundingRaised) / Number(fundingGoal)) * 100).toFixed(2));
}

export function getProjectStatus(currentBlock, deadlineBlock, fundsRaised, fundingGoal) {
    let status = "-";

    if (currentBlock > deadlineBlock) {
        if (fundsRaised >= fundingGoal) {
            status = "Funded";
        } else {
            status = "Failed";
        }
    } else {
        if (fundsRaised >= fundingGoal) {
            status = "Funded";
        } else {
            status = "Active";
        }
    }
    return status;
}
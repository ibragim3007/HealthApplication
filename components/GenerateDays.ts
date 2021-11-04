const DaysInMounth = [31, 28, 31, 31, 31, 31, 31, 31, 30, 31, 31, 31]

const upCurrentMonth = (currentMounth: number) => {
    if(currentMounth == 12) { currentMounth = 1;}
    else { currentMounth++; } 
    return currentMounth;
}

export const GenerateDays = (currentDate: number, currentMounth: number) => {
    const maxDays:number = 7
    const DaysInCurrent:number = currentDate + maxDays
    let DateArray = new Array(maxDays)

    if(DaysInCurrent <= DaysInMounth[currentMounth - 1])
    {
        for(let i = 0; i < maxDays; i++)
        {
            DateArray[i] = {
                date: currentDate,
                mounth: currentMounth
            }
            currentDate++
        }
    }
    else if(DaysInCurrent > DaysInMounth[currentMounth - 1])
    {
        for(let i = 0; i < maxDays; i++)
        {
            if(currentDate <= DaysInMounth[currentMounth - 1]) 
            {
                DateArray[i] = {
                    date: currentDate,
                    mounth: currentMounth
                }
                currentDate++
            }
            else if (currentDate >= DaysInMounth[currentMounth - 1]) {
                currentDate = 1
                currentMounth++
                i--
            }
        }
    }

    return DateArray
}
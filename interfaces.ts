export interface IMedical {
    name: string;
    timeWhenNeedUse?: Date;
    timeWhenAdded?: Date;
    transcription?: string;
    howMuchNeedUse: number;
    whichDayNeedUse: number;
    whichMounthNeedUse: number;
}

export interface IDateForGenerateWeek {
    date: number;
    mounth: number;
} 

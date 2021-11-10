export interface IMedical {
    name: string;
    timeWhenNeedUse?: Date;
    timeWhenAdded?: Date;
    selected?: number | null;
    transcription?: string | null;
    howMuchNeedUse: number;
    daysNeedUse: IDateForGenerateWeek[];
}

export interface IDateForGenerateWeek {
    date: number;
    mounth: number;
} 


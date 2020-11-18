export interface CensusBlock {
    Block: {
        FIPS: string;
        bbox: number[];
    };
    County: {
        FIPS: string;
        name: string;
    };
    State: {
        FIPS: string;
        code: string;
        name: string;
    };
    status: string;
    executionTime: string;
}

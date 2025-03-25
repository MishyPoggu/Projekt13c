export interface UserMachine { 
        arcadeMachines?: 
            {
                id: number,
                name: string,
                release: number,
                genre: string,
                publisher: string,
                createdAt: string,
                updatedAt: string,
                userId: number
            },
        consoles?:
            {
                id: number,
                name: string,
                release: number,
                genre?: string,
                publisher: string,
                createdAt: string,
                updatedAt: string,
                userId: number
            },   
        pinballMachines?: {
                id: number,
                name: string,
                release: number,
                genre?: string,
                publisher: string,
                createdAt: string,
                updatedAt: string,
                userId: number
        }
}

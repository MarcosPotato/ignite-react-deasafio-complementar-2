export interface Food{
    id: number
    name: string
    description: string
    price: number
    available: boolean
    image: string
}

export interface NewFood{
    image: string
    name: string
    price: string
    description: string
}

export interface FoodContextProps{
    foods: Food[]
    getFoods: () => Promise<void>
    handleDeleteFood: (id: number) => Promise<void>
    handleUpdateFood: (food: FoodInfo) => Promise<void>
    handleAddFood: (food: NewFood) => Promise<void>
}
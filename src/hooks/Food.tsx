import React, { useContext } from "react";
import { createContext, useState, useCallback } from "react";

import api from '../services/api';

import { Food, FoodContextProps, NewFood } from "../@types/Food";

const FoodContext = createContext({} as FoodContextProps)

export const FoodProvider: React.FC = ({ children }) => {

    const [foods, setFoods] = useState<Food[]>([])

    const handleAddFood = useCallback(async (food: NewFood) => {
        try {
            const response = await api.post('/foods', {
                ...food,
                available: true,
            });

            setFoods(prev => [...prev, response.data])
        } catch (err) {
            console.log(err);
        }
    },[])

    const handleUpdateFood = useCallback(async (food: Food) => {
        try {
            const foodUpdated = await api.put(`/foods/${food.id}`, food);

            const foodsUpdated = foods.map(f =>
                f.id !== foodUpdated.data.id ? f : foodUpdated.data,
            );

            setFoods(foodsUpdated)
        } catch (err) {
            console.log(err);
        }
    },[foods])

    const handleDeleteFood = useCallback(async (id: number) => {
        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter(food => food.id !== id);

        setFoods(foodsFiltered)
    },[foods])

    return (
        <FoodContext.Provider value={{ foods, handleAddFood, handleUpdateFood, handleDeleteFood }}>
            { children }
        </FoodContext.Provider>
    )
}

export const useFood = () => {
    const context = useContext(FoodContext)

    if(!context){
        throw new Error("Hook use food must be used inside a FoodProvider")
    }

    return context
}
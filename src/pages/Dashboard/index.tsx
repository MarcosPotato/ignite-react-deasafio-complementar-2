import React from 'react';
import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { Food as FoodInfo, NewFood } from '../../@types/Food';

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<FoodInfo[]>([])
  const [editingFood, setEditingFood] = useState<FoodInfo>({} as FoodInfo)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

  const handleAddFood = async (food: NewFood) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods(prev => [...prev, response.data])
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: FoodInfo) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered)
  }

  const toggleModal = () => {
    setModalOpen(prev => !prev)
  }

  const toggleEditModal = () => {
    setEditModalOpen(prev => !prev)
  }

  const handleEditFood = (food: FoodInfo) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  useEffect(() => {
    const loadFood = async() => {
      const response = await api.get('/foods');
      console.log(response.data)
      setFoods(response.data)
    }

    loadFood()
  },[])

  return (
    <>
      <Header openModal={ toggleModal } />
      <ModalAddFood
        isOpen={ modalOpen }
        setIsOpen={ toggleModal }
        handleAddFood={ handleAddFood }
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={ handleDeleteFood }
              handleEditFood={ handleEditFood }
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;

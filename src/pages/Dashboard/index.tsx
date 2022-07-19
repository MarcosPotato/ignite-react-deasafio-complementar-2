import React from 'react';
import { useState, useEffect } from 'react';

import { Food as FoodInfo } from '../../@types/Food';
import { useFood } from '../../hooks/Food';

import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

const Dashboard: React.FC = () => {

  const { foods, getFoods } = useFood()

  const [editingFood, setEditingFood] = useState<FoodInfo>({} as FoodInfo)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

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
    console.log("chamando")
    getFoods()
  },[getFoods])

  return (
    <>
      <Header openModal={ toggleModal } />
      <ModalAddFood
        isOpen={ modalOpen }
        setIsOpen={ toggleModal }
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleEditFood={ handleEditFood }
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Habit from '../habit';


describe("habit", () => {
  const habit = { name: 'Habit', count: 4 };
  let onIncrement;
  let onDecrement;
  let onDelete;
  let HabitComponent;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    HabitComponent = (
     <Habit
        habit={habit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />
    )
  });

  describe("button click", () => {
    beforeEach(() => {
      render(HabitComponent);
    });

    it("calls onIncrement when clicking 'increment' button", () => {
      const button = screen.getByTitle("increase");
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habit);
    });

    it("calls onDecrement when clicking 'decrement' button", () => {
      const button = screen.getByTitle("decrease");
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habit);
    });

    it("calls onDelete when clicking 'delete' button", () => {
      const button = screen.getByTitle("delete");
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habit);
    });
  })
});
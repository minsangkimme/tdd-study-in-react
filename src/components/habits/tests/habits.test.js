import React from 'react';
import Habits from '../habits';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe("Habits Component", () => {
    const habits = [
        {id: 1, name: 'Reading', count: 2},
        {id: 2, name: 'Apple', count: 0},
    ];
    let HabitsComponent;
    let onIncrement;
    let onDecrement;
    let onDelete;
    let onAdd;
    let onReset;

    beforeEach(() => {
        onIncrement = jest.fn();
        onDecrement = jest.fn();
        onDelete = jest.fn();
        onAdd = jest.fn();
        onReset = jest.fn();
        
        HabitsComponent = (
            <Habits
              habits={habits}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onDelete={onDelete}
              onAdd={onAdd}
              onReset={onReset}
            />
        );
    });

    it("render", () => {
      const component = renderer.create(HabitsComponent);
      expect(component.toJSON()).toMatchSnapshot();
    });

    describe("button Click", () => {
      beforeEach(() => {
        render(HabitsComponent);
      });

      it("calls onAdd when clicking the 'Add' Button", () => {
        const input = screen.getByPlaceholderText("Habit");
        const button = screen.getByText("Add");
        const newHabit = "New Habit";

        userEvent.type(input, newHabit);
        userEvent.click(button);

        expect(onAdd).toHaveBeenCalledWith(newHabit);
      });

      it("calls onIncrement when clicking the 'increment' Button", () => {
        const button = screen.getAllByTitle("increase")[0];
        userEvent.click(button);

        expect(onIncrement).toHaveBeenCalledWith(habits[0]);
      });

      it("calls onDecrement when clicking the 'Delete' Button", () => {
        const button = screen.getAllByTitle("decrease")[0];
        userEvent.click(button);

        expect(onDecrement).toHaveBeenCalledWith(habits[0]);
      });

      it("calls onReset when clicking the 'reset' Button", () => {
        const button = screen.getByText("Reset All");
        userEvent.click(button);

        expect(onReset).toHaveBeenCalledTimes(1);
      });

      it("calls onDelete when clicking the 'Delete' Button", () => {
        const button = screen.getAllByTitle("delete")[0];
        userEvent.click(button);

        expect(onDelete).toHaveBeenCalledWith(habits[0]);
      });

    })
});
import HabitPresenter from '../habit_presenter';

describe("Habit Presenter", () => {
    const habits = [
        { id: 1, name: 'Reading', count: 0 },
        { id: 2, name: 'Running', count: 0 },
    ];
    let presenter;
    let update;

    beforeEach(() => {
        presenter = new HabitPresenter(habits, 3);
        update = jest.fn();
    });


    it("init with habis", () => {
        expect(presenter.getHabits()).toEqual(habits);
    });

    it("increments habit count call and update callback", () => {
        presenter.increment(habits[0], update);

        expect(presenter.getHabits()[0].count).toBe(1);
        checkUpdateIsCalled();
    });

    it("decrements habit count call and update callback", () => {
        presenter.decrement(habits[0], update);

        expect(presenter.getHabits()[0].count).toBe(0);
        checkUpdateIsCalled();
    });

    it("does not set the count value below 0 when decrement", () => {
        presenter.decrement(habits[0], update);
        presenter.decrement(habits[0], update);

        expect(presenter.getHabits()[0].count).toBe(0);
    });

    it("deletes habit from the list", () => {
        presenter.delete(habits[0], update);

        expect(presenter.getHabits()[0].name).toBe("Running");
        expect(presenter.getHabits()[0].count).toBe(0);
        checkUpdateIsCalled();

    });

    it("adds new habit to the list", () => {
        presenter.add("Eating", update);

        expect(presenter.getHabits()[2].name).toBe("Eating");
        expect(presenter.getHabits().length).toBe(3);
        checkUpdateIsCalled();
    });

    it("throw an error when the max habits limit is exceeded", () => {
        presenter.add("Eating", update);
        expect(() => {
            presenter.add("Eating", update)
        }).toThrow('습관의 갯수는 3 이상이 될 수 없습니다.')
    });

    describe("reset", () => {
        it("set all habit counts to 0", () => {
            presenter.reset(update);
    
            expect(presenter.getHabits()[0].count).toBe(0);
            expect(presenter.getHabits()[1].count).toBe(0);
            checkUpdateIsCalled();
        });

        it("does not creat new object when count is 0", () => {
            const habits = presenter.getHabits();
            presenter.reset(update);
            
            const updateHabits = presenter.getHabits();
            expect(updateHabits[0]).toBe(habits[0]);
        });

    });


    function checkUpdateIsCalled() {
        expect(update).toHaveBeenCalledTimes(1);
        expect(update).toHaveBeenCalledWith(presenter.getHabits());
    }


});
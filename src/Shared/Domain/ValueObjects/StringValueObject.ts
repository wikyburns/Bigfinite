

class StringValueObject
{
    protected value: string;

    constructor(value: string)
    {
        this.value = value;
    }

    getValue(): string
    {
        return this.value;
    }

}

export default StringValueObject;
class Matrix {

    constructor() {
        try {
            let list = Matrix.#prepare_matrix(arguments)
            Matrix.#check_matrix(list)

            this.matrix = list
            this.row = list.length
            this.col = list[0].length


        } catch (e) {
            console.error(e)
        }
    }

    /**
     * Get the n th row (start from 0)
     * @param row : Number
     * @return {Array}
     */
    getRow(row) {
        if (row >= 0 && row < M.row)
            return this.matrix[row]
        else {
            throw `IndexError: \n\tRow number exceeds the range.`
        }
    }

    static Identity(n) {
        let array = Array(n)
        for (let i = 0; i < n; i++) {
            array[i] = Array(n).fill(0)
            array[i][i] = 1
        }
        return array
    }

    /**
     * Get the n th column (start from 0)
     * @param col : Number
     * @return {Array}
     */
    getColumn(col) {
        if (col >= 0 && col < M.col)
            return this.matrix.map(c => c[col])
        else {
            throw `IndexError: \n\tColumn number exceeds the range.`
        }
    }

    setRow(i, values) {
    }

    setColumn(j, values) {

    }

    /**
     * Calculate the determination of matrix
     * @return {number}
     */
    determination() {
        return Matrix.#determination(this.matrix)
    }

    /**
     * Is the matrix Independent or Not
     * @return {boolean}
     */
    isIndependent() {
        return this.determination() !== 0;
    }

    solve() {
        let arr = Object.values(
            arguments.length === 1 ? arguments[0] : arguments)

        if (!Array.isArray(arr)) {
            throw 'TypeError : \n\tParameters Type must be an Array'
        } else {
            arr.map(c => +c)
        }

        if (arr.length !== this.row) {
            throw `IndexError : \n\t Number of element must be equal to ${this.row} rows`
        } else if (arr.includes(NaN)) {
            throw 'TypeError : \n\t Elements of the Array must be of type Number'
        } else {
            let D = this.determination()
            if (D === 0) return null
            else {
                let solutions = []
                let Mi = Matrix.#copyMatrix(this.matrix)
                for (let i = 0; i < this.row; i++) {

                    Matrix.#setColumns(Mi, i, arr)
                    solutions.push(Matrix.#determination(Mi) / D)
                    Matrix.#setColumns(Mi, i, this.getColumn(i))
                }
                return solutions
            }
        }
    }

    /**
     * Is the matrix is Squared or not (matrix of type n x n)
     * @return {boolean}
     */
    isSquared() {
        return this.row === this.col && this.row > 0
    }

    /**
     * Swap two lines of  matrix
     * @param i : Number
     * @param j : Number
     */
    swapLines(i, j) {
        try {
            let tmp = this.getRow(i)
            this.matrix[i] = this.getRow(j)
            this.matrix[j] = tmp
        } catch (e) {
            console.error(e)
        }
    }

    swapColumns(i, j) {
        try {

        } catch (e) {
            console.error(e)
        }
    }

    diagonalize(M) {

    }

    static inverse(M) {
        if (this.#determination(M) === 0)
            return null
        else {
            let In = this.Identity(M.length)
            let Mi = this.#copyMatrix(M)

        }
    }

    static #setLines(matrix, row, values) {
        matrix[row].map((c, index) => values[index])
    }

    static #setColumns(matrix, column, values) {
        for (let j = 0; j < matrix.length; j++) {
            matrix[j][column] = values[j]
        }
    }

    #check_Line(Matrix, line) {

    }

    static #swapLines(M, i, j) {
        if (M.length < i || M.length < j)
            throw `IndexError: \n\tRow number exceeds the range.`
        else {
            let tmp = M[i]
            M[i] = M[j]
            M[j] = tmp
        }
    }

    static #isSquared(M) {
        return M.length === M[0].length && M.length > 0
    }

    static #checkLine(M) {


    }

    static #determination(matrix) {
        try {
            this.#check_matrix(matrix)
            let size = matrix.length

            if (this.#isSquared(matrix)) {

                let result = 1
                let M = Matrix.#copyMatrix(matrix)
                for (let i = 0; i < size - 1; i++) {
                    let C_1 = M[i][i]

                    // is Coefficient null  ?
                    if (C_1 === 0) {

                        // find a line to swap it with
                        for (let j = i + 1; i < size; j++) {
                            if (M[j][i] !== 0) {
                                C_1 = M[j][i]
                                this.#swapLines(M, i, j)
                                result *= -1
                                break
                            }
                        }
                        if (C_1 === 0) return 0
                    }
                    result *= C_1

                    for (let j = i + 1; j < size; j++) {
                        let C_j = M[j][i]
                        if (C_j === 0) continue
                        //
                        M[j] = M[j].map((c, k) => M[j][k] - M[i][k] * C_j / C_1)
                    }
                }
                return result * M[size - 1][size - 1]

            } else {
                throw "SyntaxError: \n\tthe Matrix must be squared"
            }
        } catch (e) {
            console.error(e)
        }
    }

    static #copyMatrix(M) {
        let newMatrix = []
        for (let i = 0; i < M.length; i++) {
            newMatrix[i] = []
            for (let j = 0; j < M[i].length; j++) {
                newMatrix[i][j] = M[i][j]
            }
        }
        return newMatrix
    }

    static #prepare_matrix(M) {
        M = Object.values(M)
        if (!Array.isArray(M)) {
            throw `Type Error : Arguments must be an Array`
        }
        return M.map(c => isNaN(c) ? Object.values(c).map(n => +n) : [+c])
    }

    static #check_matrix(M) {
        let row = M.length
        let col = M[0].length

        if (row === 0) {
            throw `Syntax Error : Number of rows must be at least 1.`
        }
        for (let i in M) {
            if (M[i].length !== col) {
                throw `Syntax Error :Length of columns must be the same (at row ${i}).`
            }
            for (let j in M[i]) {
                if (isNaN(M[i][j])) {
                    throw `Type Error : Coefficient must be a Number (at [${i}][${j}] ).`
                }
            }
        }
    }

}

M = new Matrix(
    [0, 1, 0],
    [0, 0, 1],
    [-2, 1, 2]
)

console.log(M.determination())

console.table()
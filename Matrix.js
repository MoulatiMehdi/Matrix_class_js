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

    getRow(row) {
        if (row >= 0 && row < M.row)
            return this.matrix[row]
        else {
            throw `IndexError: \n\tRow number exceeds the range.`
        }
    }

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

    determination() {
        return Matrix.#determination(this.matrix)
    }

    isIndependent() {
        return this.determination() !== 0;
    }

    isSquared() {
        return this.row === this.col && this.row > 0
    }

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

    static #swapLines(M, i, j) {
        if(M.length<i || M.length < j)
            throw `IndexError: \n\tRow number exceeds the range.`
        else{
            let tmp = M[i]
            M[i] = M[j]
            M[j] = tmp
        }
    }

    static #isSquared(M) {
        return M.length === M[0].length
    }

    static #determination(matrix) {
        try {
            this.#check_matrix(matrix)
            let size = matrix.length

            if (this.#isSquared(matrix)) {
                if (Matrix.#isZero(matrix, size, size)) {
                    return 0
                } else {
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
                                    this.#swapLines(M,i,j)
                                    result *= -1
                                    break
                                }
                            }
                            if (C_1 === 0) return 0
                        }
                        result *= C_1

                        for (let j = i + 1; j < size; j++) {
                            let C_2 = M[j][i]
                            if (C_2 === 0) continue
                            M[j] = M[j].map((c, k) => C_2 * M[i][k] - C_1 * M[j][k])
                        }
                    }
                    return result * M[size - 1][size - 1]
                }
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

    static #isZero(M, row, col) {

        let sum_row = 0
        let sum_col = 0
        for (let i = 0; i < row; i++) {

            for (let j = 0; j < col; j++) {
                sum_row += M[i][j]
                sum_col += M[j][i]
            }
            if (sum_row * sum_col === 0) return true
            sum_col = 0
            sum_row = 0
        }
        return false
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

M = new Matrix([0, 2, -1], [0, -1, 2], [3, 5, -3])
console.table(M.determination())
console.table(M.matrix)


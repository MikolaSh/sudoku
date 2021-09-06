module.exports = function solveSudoku(matrix) {
    const size = 9;
    const boxSize =3;
    
    const findEmpty = (matrix) => {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if(matrix[i][j]==0){
                    return [i,j];
                }
            }
        }
        return null;
    }

    const validate = (num, position, matrix)=>{
        const [r,c] = position;

        //rows
        for(let i = 0; i<size;i++){
            if(matrix[i][c]=== num && i!==r){
                return false;
            }
        }

        //cols
        for(let i = 0; i<size;i++){
            if(matrix[r][i]=== num && i!==c){
                return false;
            }
        }

        //box
        const boxRow = Math.floor(r/boxSize) * boxSize
        const boxCol = Math.floor(c/boxSize) * boxSize

        for(let i = boxRow;i<boxRow+boxSize;i++){
            for (let j = boxCol; j < boxCol + boxSize; j++) {
                if(matrix[i][j] == num && i!==r && j!==c){
                    return false;
                }
                
            }
        }

        return true;

    }

    const solve = () => {
        const currPosition = findEmpty(matrix);

        if(currPosition === null){
            return true;
        }

        for (let i = 1; i < size+1; i++) {
            const currNumber = i;
            const isValid = validate(currNumber, currPosition, matrix)

            if(isValid){
                const [x,y] = currPosition;
                matrix[x][y] = currNumber;

                if(solve()){
                    return true;
                }

                matrix[x][y] = 0;
            }
        }

        return false;
    }


    solve();
    return matrix;
}

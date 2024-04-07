// Functions for carrying out the calculations
// -------------------------------------------
const crossSectionalAreasDict = {
    6: 28.5,
    8: 50.3,
    10: 78.5,
    12: 113.1,
    16: 201.1,
    20: 314.2,
    25: 490.9,
    32: 804.2
}

function calculateUltimateLoad(ultimateStress, size) {
    return (parseFloat(ultimateStress) * crossSectionalAreasDict[size]) / 1000
}

function calculateYieldStress(ultimateStress) {
    return parseFloat(ultimateStress) * 0.82
}

function calculateUltimateStress(yieldStress) {
    return parseFloat(yieldStress) / 0.82
}

function calculateYieldLoad(yieldStress, size) {
    return (parseFloat(yieldStress) * crossSectionalAreasDict[size]) / 1000
}

function calculateElongation(ultimateLoad, yieldLoad, size) {
    if (size === 10) return parseFloat(ultimateLoad) * 0.3

    return parseFloat(yieldLoad) * 0.3
}
// -----------------------------------------

const form = document.getElementById('input-form')

const ultimateStressField = document.getElementById('ultimate-stress')
const yieldStressField = document.getElementById('yield-stress')
const ultimateLoadField = document.getElementById('ultimate-load')
const yieldLoadField = document.getElementById('yield-load')
const elongationField = document.getElementById('elongation')
const sizeField = document.getElementById('size')

function resetValues() {
    ultimateLoadField.value = ''
    yieldLoadField.value = ''
    elongationField.value = ''
}

ultimateStressField.addEventListener('input', function() {
    yieldStressField.value = ''
    resetValues()
});


yieldStressField.addEventListener('input', function() {
    ultimateStressField.value = ''
    resetValues()
});

form.addEventListener('submit', (event) => {
    event.preventDefault() // Stops page from reloading

    var ultimateStress = ultimateStressField.value.trim()
    var yieldStress = yieldStressField.value.trim()

    // Input validation lol
    if (!ultimateStress && !yieldStress) {
        alert("Either the Ultimate Stress or Yield Stress values should be provided.")
        return
    }

    if (ultimateStress && isNaN(parseFloat(ultimateStress))) {
        alert("The Ultimate Stress value must be a number.")
        return
    }

    if (yieldStress && isNaN(parseFloat(yieldStress))) {
        alert("The Yield Stress value must be a number.")
        return
    }

    // Gotta make sure that they exist y'know
    if (ultimateStress) {
        yieldStress = calculateYieldStress(ultimateStress).toFixed(2)
        yieldStressField.value = yieldStress
    }
    else if (yieldStress) {
        ultimateStress = calculateUltimateStress(yieldStress).toFixed(2)
        ultimateStressField.value = ultimateStress
    }

    // Calculations. Finally.
    const size = parseInt(sizeField.value)

    const ultimateLoad = calculateUltimateLoad(ultimateStress, size)
    const yieldLoad = calculateYieldLoad(yieldStress, size)
    const elongation = calculateElongation(ultimateLoad, yieldLoad, size)

    ultimateLoadField.value = ultimateLoad.toFixed(2)
    yieldLoadField.value = yieldLoad.toFixed(2)
    elongationField.value = elongation.toFixed(2)
});
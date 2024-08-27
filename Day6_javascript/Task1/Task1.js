let btn=document.getElementById("form-btn")
let isValid=false;
function verifyinput(e)
{
    const errormsg=document.getElementById("error");
    const val=parseInt(e.target.value);
    if(val<500 || val >10000)
    {
         errormsg.style.display="block"
        isValid=false;
    }
    else
    {
        errormsg.style.display="none"
        isValid=true;
    }
}
function handlesubmit(e)
{
    e.preventDefault();
    if(isValid){
    const form=document.forms["my-form"];
    const principalAmount=parseInt(form["principal-amount"].value);
    let interest=parseInt(form["rate-of-interest"].value);
    const years=parseInt(form["no-of-years"].value);
    const interestelement=document.getElementById("interest")
    const totalamountelement=document.getElementById("total-amount")
    const discountelement=document.getElementById("discount-applied")
        if(principalAmount>=1000 && principalAmount<=5000)
        {
            interest=7;
        }
        else if(principalAmount<1000)
        {
            interest=5;
        }
        else
        {
            interest=10;
        }
        if (years>5)
        {
            interest+=2;
        }
        let interestAmount=(principalAmount*interest*years)/100;
        interestelement.innerHTML=`Interest : $${interestAmount}`
        totalamountelement.innerHTML=`Total Amount : $${principalAmount+interestAmount}`
        discountelement.innerHTML=`Additional information : ${interest} % interest applied`
    }
}
let btn=document.getElementById("form-btn")
document.forms["my-form"]["principal-amount"].addEventListener('input',(e)=>
{
    const errormsg=document.getElementById("error");
    const val=parseInt(e.target.value);
    if(Number.isNaN(val))
    {
        e.target.style.borderColor="red";
    }
    else
    {
        e.target.style.borderColor="gray";
        if(val<500 || val >10000)
        {
            errormsg.style.display="block"
        }
        else
        {
             errormsg.style.display="none"
        }
    }
})
btn.addEventListener('click',(e)=>
{
    e.preventDefault();
    const form=document.forms["my-form"];
    const principalAmount=parseInt(form["principal-amount"].value);
    let interest=parseInt(form["roi"].value);
    const years=parseInt(form["noy"].value);
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
)
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Transfer the money from one branchuser account to others
 * @param {org.hackerearth.blockchain.TransferMoney} transferMoney
 * @transaction
 */
function transferMoney(transferMoney) {

    var amouttobetransfered=transferMoney.amountToBeTransfred

    transferMoney.toAccount.balance=transferMoney.toAccount.balance+amouttobetransfered

    transferMoney.fromAccount.balance=transferMoney.fromAccount.balance-amouttobetransfered


    return getAssetRegistry('org.hackerearth.blockchain.Account')
        .then(function(accountRegistry) {
           
                return accountRegistry.updateAll([transferMoney.toAccount, transferMoney.fromAccount]);
        })
}

/**
 * Assign an account with opening balance to requested user 
 * @param {org.hackerearth.blockchain.AssignAnAccount} assignAnAccount
 * @transaction
 */
function assignAnAccount(openAnAccount) {
   var initialBalance = openAnAccount.initalBalance;

   if (openAnAccount.accountOwner.accounts == null) {
        openAnAccount.accountOwner.accounts = [];
    }

    openAnAccount.accountToBeOpened.balance=initialBalance;

    openAnAccount.accountOwner.accounts.push(openAnAccount.accountToBeOpened);
    return getAssetRegistry('org.hackerearth.blockchain.BranchUser')
        .then(function(branchUserRegistry) {
            // save the vehicle listing
            return branchUserRegistry.update(openAnAccount.accountOwner);
        });
}

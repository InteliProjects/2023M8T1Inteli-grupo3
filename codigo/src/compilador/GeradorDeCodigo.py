from ClassesAuxiliares import InternNode , LeafNode 

class GeradorDeCodigo:

    def __init__(self, tree):
        self.tree = tree
        self.pythonString = ""
        self.currentT = ""

    def generateCode(self):
        self.pythonString += "import pygame\n"
        self.pythonString += "from funcoesAuxiliares import ler, mostrar_tocar_feedback\n"
        self.pythonString += "\n"
        self.pythonString += "def " + self.tree.getNode("string").value + "():\n"
        self.currentT += "\t"
        self.block(self.tree.getNode("block"))
        self.functions()
        return self.pythonString
    
    def functions(self):
        self.pythonString += self.currentT
        self.pythonString += "run = True\n"
        self.pythonString += self.currentT
        self.pythonString += "while run:\n"
        self.currentT += "\t"
        self.pythonString += self.currentT
        self.pythonString += "display.fill((255, 255, 255))\n"
        self.pythonString += self.currentT
        self.pythonString += "txtsurf = pygame.font.SysFont(\"Arial\", 70).render('PARABENS! VOCE FINALIZOU A TAREFA.', True, (0, 0, 0))\n"
        self.pythonString += self.currentT
        self.pythonString += "display.blit(txtsurf, (640 - (txtsurf.get_size()[0] / 2), 360 - (txtsurf.get_size()[1] / 2)))\n"
        self.pythonString += self.currentT
        self.pythonString += "pygame.display.update()\n"
        self.pythonString += self.currentT
        self.pythonString += "pygame.time.wait(3000)\n"
        self.pythonString += self.currentT
        self.pythonString += "run = False\n"
        self.pythonString += "\n"
        self.currentT = self.currentT[:-1]
        self.pythonString += self.currentT
        self.pythonString += 'print("Errors: " + str(erros) + ", Success: " + str(acertos))'
        self.currentT = self.currentT[:-1]
        self.pythonString += "\n"
        self.pythonString += "pygame.init()\n"
        self.pythonString += "pygame.display.set_caption('Image') \n"
        self.pythonString += "display = pygame.display.set_mode((1280, 720))\n"
        self.pythonString += "display.fill((255, 255, 255))\n"
        self.pythonString += "\n"
        self.pythonString += self.tree.getNode("string").value + "()\n"
        self.pythonString += "pygame.quit()\n"
    
    def block(self, block):
        statementList = block.getNode("statementList")
        
        while statementList:
            statement = statementList.getNode("statement")
            if statement.op == "whileStatement":
                self.pythonString += self.currentT
                self.pythonString += "while "
                self.expression(statement.getNode("expression"))
                self.pythonString += ":\n"
                self.currentT += "\t"
                self.block(statement.getNode("block"))
                self.currentT = self.currentT[:-1]
            if statement.op == "ifStatement":
                self.pythonString += self.currentT
                self.pythonString += "if "
                self.expression(statement.getNode("expression"))
                self.pythonString += ":\n"
                self.currentT += "\t"
                self.block(statement.getNode("ifBlock"))
                self.currentT = self.currentT[:-1]
                if statement.getNode("elseBlock"):
                    self.pythonString += self.currentT
                    self.pythonString += "else:\n"
                    self.currentT += "\t"
                    self.block(statement.getNode("elseBlock"))
                    self.currentT = self.currentT[:-1]
            if statement.op == "assignStatement":
                    self.assignStatement(statement)
            if statement.op == "commandStatement":
                self.commandStatement(statement)

            statementList = statementList.getNode("prox")

    def expression(self, expression):
        if expression.op in ["expression", "sumExpression", "multTerm"]:
            esq = expression.getNode("esq")
            dir = expression.getNode("dir")
            if dir:
                self.pythonString += "("
                self.expression(esq)
                self.addOper(expression.getNode('oper'))
                self.expression(dir)
                self.pythonString += ")"
            else:  
                self.expression(esq)
        elif expression.op == "factor":
            factorNode = expression.getNode("factor")
            signal = expression.getNode("sinal")
            if factorNode.op in ["factor", "int", "log", "id"]:
                if signal == "-":
                    self.pythonString += "-"    
                self.pythonString += str(factorNode.value)
            elif factorNode.op == "expression":
                self.expression(factorNode)

    def assignStatement(self, statement):
        esq = statement.getNode("esq")
        dir = statement.getNode("dir")
        if statement.getNode("inputStatement"):
            self.pythonString += self.currentT
            self.pythonString += statement.getNode("id").value + " = "
            self.inputStatement(statement.getNode("inputStatement"))
        elif statement.getNode("expression"):
            esq = statement.getNode("expression").getNode("esq")
            dir = statement.getNode("expression").getNode("dir")
            self.pythonString += self.currentT
            self.pythonString += statement.getNode("id").value + " = "
            if esq.op == "factor":
                self.pythonString += str(esq.getNode("factor").value)
            elif esq.op == "sumExpression":
                self.assignStatement(esq)
                if dir:
                    self.assignStatement(dir)
            elif esq.op == "multTerm":
                self.assignStatement(esq)
                if dir:
                    self.assignStatement(dir)
            self.pythonString += "\n"
        elif statement.op in ["sumExpression", "multTerm", "powerTerm"]:
            if esq.op in ["sumExpression", "multTerm", "powerTerm"]:
                self.assignStatement(esq)
                if dir:
                    self.assignStatement(dir)
            elif esq.op == "factor":
                if esq.getNode("factor").op == "expression":
                    self.expression(esq.getNode("factor"))
                else:
                    self.pythonString += str(esq.getNode("factor").value)
            self.addOper(statement.getNode("oper"))
            if dir.op == "factor":
                self.pythonString += str(dir.getNode("factor").value) + " "
            if dir:
                self.assignStatement(dir)

           
           

    def inputStatement(self, inputStatement):
        command = inputStatement.getNode("command")
        if command.value in ["ler"]:
            self.pythonString += command.value + "()\n"
        elif command.value in ["ler_varios"]:
            esq = inputStatement.getNode("esq").getNode("factor").value
            mid = inputStatement.getNode("mid").getNode("factor").value
            dir = inputStatement.getNode("dir").getNode("factor").value
            self.pythonString += command.value + "(" + str(esq) + ", " + str(mid) + ", " + str(dir) +")\n"

    def commandStatement(self, commandStatement):
        command = commandStatement.getNode("command")
        if command.value in ["mostrar", "tocar", "esperar"]:
            self.pythonString += self.currentT
            self.pythonString += commandStatement.getNode("command").value
            self.pythonString += "("
            self.expression(commandStatement.getNode("sumExpression"))
            self.pythonString += ")"
            self.pythonString += "\n"
        elif command.value in ["mostrar_tocar"]:
            self.pythonString += self.currentT
            esq = commandStatement.getNode("esq")
            dir = commandStatement.getNode("dir")
            self.pythonString += command.value + "("
            self.expression(esq)
            self.pythonString += ", "
            self.expression(dir)
            self.pythonString += ")\n"
        elif command.value in ["mostrar_tocar_feedback"]:
            self.pythonString += self.currentT
            esq = commandStatement.getNode("esq")
            mid = commandStatement.getNode("mid")
            dir = commandStatement.getNode("dir")
            self.pythonString += command.value + "("
            self.expression(esq)
            self.pythonString += ", "
            self.expression(mid)
            self.pythonString += ", "
            self.expression(dir)
            self.pythonString += ")\n"

    def addOper(self, oper):
        if oper == "<>":
            self.pythonString += " != "
        else:
            self.pythonString += " " + oper + " "
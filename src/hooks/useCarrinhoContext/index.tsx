"use client"

import { CarrinhoContext } from "@/context/carrinhoContext";
import Produto from "@/module/produto";
import { useContext } from "react";

export default function useCarrinhoContext() {
    const context = useContext(CarrinhoContext);

    if (!context) {
        throw new Error("useCarrinhoContext must be used within a CarrinhoProvider");
    }

    const { carrinho, setCarrinho } = context;
    
    function adicionarUmProdutoCarrinho(
        produto: Produto, 
        corSelecionada: string, 
        tamanhoSelecionado: string
    ): void {
        const produtoExistente = carrinho.find(
            (p) => p.id === produto.id && p.cor === corSelecionada && p.tamanho === tamanhoSelecionado
        );

        if (produtoExistente) {
            const newCarrinho = carrinho.map((p) =>
                p.id === produto.id && p.cor === corSelecionada && p.tamanho === tamanhoSelecionado
                    ? { ...p, quantidade: p.quantidade + 1 }
                    : p
            );
            setCarrinho(newCarrinho);
        } else {
            setCarrinho([...carrinho, { ...produto, quantidade: 1, cor: corSelecionada, tamanho: tamanhoSelecionado }]);
        }
    }

    function adicionarQuantidadeCarrinho(
        produto: Produto, 
    ): void {
        const produtoExistente = carrinho.find((p) => p.id === produto.id);

        if (produtoExistente) {
            const newCarrinho = carrinho.map((p) =>
                p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
            );
            setCarrinho(newCarrinho);
        }
    }

    function excluiProdutoCarrinho(
        produto: Produto
    ): void {
        const newCarrinho = carrinho.filter((p) => p.id !== produto.id);
        setCarrinho(newCarrinho);
    }

    function removeUmProdutoCarrinho(
        produto: Produto
    ): void {
        const produtoExistente = carrinho.find((p) => p.id === produto.id);

        if (produtoExistente?.quantidade === 1) {
            excluiProdutoCarrinho(produto);
        } else {
            const newCarrinho = carrinho.map((p) =>
                p.id === produto.id ? { ...p, quantidade: p.quantidade - 1 } : p
            );
            setCarrinho(newCarrinho);
        }
    }

    function editaQuantidadeProdutoCarrinho(
            produto: Produto, 
            quantidade: number
        ): void {
        const produtoExistente = carrinho.find((p) => p.id === produto.id);

        if (produtoExistente) {
            const newCarrinho = carrinho.map((p) =>
                p.id === produto.id ? { ...p, quantidade } : p
            );
            setCarrinho(newCarrinho);
        }
    }
    
    return {
        carrinho,
        setCarrinho,
        editaQuantidadeProdutoCarrinho,
        adicionarUmProdutoCarrinho,
        adicionarQuantidadeCarrinho,
        excluiProdutoCarrinho,
        removeUmProdutoCarrinho
    }
}